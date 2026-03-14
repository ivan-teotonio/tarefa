import { HtmlProps } from 'react';
import styles from './style.module.css';

export function TextArea({ ...rest }: HtmlProps<HTMLTextAreaElement>) {
    return(
        <textarea className={styles.textarea} placeholder="Digite sua tarefa aqui..." {...rest}></textarea>
    )
}