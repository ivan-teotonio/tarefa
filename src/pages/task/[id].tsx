import Head from 'next/head'; 
import styles from './style.module.css';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaTrash } from 'react-icons/fa';

import { db } from '../../services/firebaseConection';
import { doc, getDocs, collection, query, where, getDoc, addDoc, deleteDoc } from 'firebase/firestore';

import { TextArea } from '../../components/TextArea';

interface TaskProps {
    item: {
        tarefa: string;
        created: string;
        public: boolean;
        user: string;
        taskId: string;
    };
    allComments: CommentsProps[]
}

interface CommentsProps {
    id: string,
    comment: string; 
    taskId: string,
    name: string; 
    user: string;
}

export default function Task({ item, allComments }: TaskProps) {

    const { data: session } = useSession();

    const [input, setInput] = useState("");
    const [ comments, setComments] = useState<CommentsProps[]>(allComments || []);


    async function handleComment (event: FormEvent) {
       event.preventDefault()
       
       if(input === "") return;

       if(!session?.user?.email || !session?.user?.name) return;

       try {
         const docRef = await addDoc(collection(db, "comments"), {
            comment: input,
            created: new Date(),
            user: session?.user?.email,
            name: session?.user?.name,
            taskId: item?.taskId
         });

        const data = {
          id: docRef.id,
          comment: input,
          user:session?.user?.email,
          name: session?.user?.name,
          taskId: item?.taskId
        }

        setComments((oldItems) => [...oldItems, data])

         setInput("");

       }catch(err) {
         console.log(err)
       }
    }

    async function handleDeleteComent(id: string) {
      try {

        const docRef = doc(db,"comments",id)
        await deleteDoc(docRef);

        const deleteComment = comments.filter((item) => item.id !== id)
        
        setComments(deleteComment)
      } catch(err) {
        console.log(err);
      }
    }

    return(
        <div className={styles.container}>
           <Head>
              <title>Detahles da Tarefa</title>
           </Head>

           <main className={styles.main}>
             <h1>Tarefa</h1>

             <article className={styles.task}>
                <p>
                    {item.tarefa}
                </p>
             </article>

           </main>

           <section className={styles.commentsContainer}>
             <h2>Deixar comentário</h2>

             <form onSubmit={handleComment}>
                <TextArea 
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value) }
                placeholder="Enviar comentário..."
                />
                <button
                disabled={!session?.user}
                className={styles.button}>Comentar</button>
             </form>
           </section>

           <section className={styles.commentsContainer}>
              <h2>Todos comentários</h2>
              {comments.length=== 0 && (
                 <span>Nenhum comentário foi encontrado...</span>
              )}

              {comments.map((item) => (
                <article key={item.id} className={styles.comment}>

                <div className={styles.headComments}>
                  <label className={styles.commentsLabel}>{item.name}</label>
                  {item.user === session?.user?.email && (
                    <button className={styles.buttonTrash} onClick={() => handleDeleteComent(item.id)}>
                     <FaTrash size={18} color="#ea3140" />
                    </button>
                  )}
                </div>

                  <p>{item.comment}</p>
                </article>
              ))}
           </section>

        </div>
    )

}

export const getServerSideProps: GetServerSideProps = async({ params }) => {
   
    const id = params?.id as string

    const docRef = doc(db, "tarefas",id)

    const q = query(collection(db,"comments"), where("taskId", "==",id))
    const snapshotComments = await getDocs(q);
 
    let allComments: CommentsProps[] = [];

    snapshotComments.forEach((doc) => {
      allComments.push({
        id: doc.id,
        comment: doc.data().comment,
        user: doc.data().user,
        name: doc.data().name,
        taskId: doc.data().taskId,
      })
    })


    const snapshot = await getDoc(docRef)

    if (snapshot.data() === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false // manda pra home
            },
        };
    }

    if (!snapshot.data()?.public) {
          return {
            redirect: {
                destination: '/',
                permanent: false // manda pra home
            },
        };
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000;

    const task = {
        tarefa: snapshot.data()?.tarefas,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id,
    }

    console.log(task)

    return {
        props: {
          item: task,
          allComments: allComments,
        },
    }

    
}