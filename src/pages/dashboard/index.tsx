import { GetServerSideProps } from 'next';
import styles from './style.module.css';
import Head from 'next/head'; 
import { ChangeEvent, useState, useEffect } from 'react';

import { getSession } from "next-auth/react";
import { TextArea } from '../../components/TextArea';
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

import { db } from '../../services/firebaseConection';
import { collection, addDoc, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';


interface HomeProps {
    user: {
        email: string;
    }
}

interface TaskProps {
    id: string; 
    created: Date; 
    public: boolean;
    tarefas: string;
    user: string;
}

export default function Dashboard({ user }: HomeProps)  {

    const [input, setInput] = useState("");
    const [publicTask, setPublicTask] = useState(false);
    const [tasks, setTasks] = useState<TaskProps[]>([]);

    useEffect(() => {
        async function loadTarefas() {

            const tarefasRef = collection(db,"tarefas")
            const q = query(
                tarefasRef,
                orderBy("created", "desc"),
                where("user", "==", user?.email)
            )

            onSnapshot(q, (snapshot) => {
               let list = [] as TaskProps[];

                snapshot.forEach((doc) => {     
                    list.push({
                        id: doc.id,
                        created: doc.data().created,
                        public: doc.data().public,
                        tarefas: doc.data().tarefas,
                        user: doc.data().user
                    })
                })

                setTasks(list);
            })

        }
        loadTarefas();
    }, [user?.email])

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {

        setPublicTask(event.target.checked);    
    }

    async function handleRegisterTask(event: React.FormEvent<HTMLFormElement>) { 
      event.preventDefault() 

      if(input === "") return;
      
      try {
        await addDoc(collection(db, "tarefas"),{
            tarefas: input,
            created: new Date(),
            user: user?.email,
            public: publicTask
        });
        setInput("");
        setPublicTask(false);
      }catch(err){
        console.log("Erro ao registrar tarefa: ", err);
      }
   }

   async function handleShare(id: string) {
     await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}/task/${id}`
     );
     alert('URL copiada com sucesso');
   }

   async function handleDeleteTask(id: string){
     const docRef = doc(db, "tarefas", id)
     await deleteDoc(docRef)
   }

    return (
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>
            
            <main className={styles.main}>
              <section className={styles.content}>
                <div className={styles.contentForm}>
                   <h1 className={styles.title}>Qual a sua tarefa</h1>

                    <form action="" onSubmit={handleRegisterTask}>
                        <TextArea
                         placeholder="Digite sua tarefa aqui..."
                         value={input}
                         onChange={(event:ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value) }
                        />
                        <div className={styles.checkboxArea}>
                           <input 
                            type="checkbox" 
                            className={styles.checkbox}
                            checked={publicTask}
                            onChange={handleChangePublic}
                           />
                           <label>Deixar tarefa pública</label>
                        </div>

                        <button className={styles.button} type='submit'>
                            Registrar
                        </button>
                    </form>

                </div>

              </section>

              <section className={styles.taskContainer}>
                 <h1>Minhas Tarefas</h1>

                 {tasks.map((item)  => (
                 <article key={item.id} className={styles.task}>
                   {item.public && (
                    <div className={styles.tagContainer}>
                        <label className={styles.tag}>PUBLICO</label>
                        <button className={styles.shareButton} onClick={() => handleShare(item.id)}>
                            <FiShare2 size={22} color="#3183ff"/>
                        </button>
                    </div>
                   )}
                  <div className={styles.taskContent}>

                    {item.public ? (
                        <Link href={`/task/${item.id}`}>
                           <p>{item.tarefas}</p>
                        </Link>
                    ) : (
                         <p>{item.tarefas}</p>
                    )}

                    <button className={styles.trashButton} onClick={() => handleDeleteTask(item.id)}>
                        <FaTrash size={24} color="#ea3140"/>
                    </button>
                  </div>
                 </article>

                 ))}
                  


              </section>

            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async({ req }) => {

    const session = await getSession({ req });

    if(!session?.user){
        // se não tem usuário vamos redirecionar para /
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props : {
            user: {
                email: session?.user?.email,
            }
        },
   };
};