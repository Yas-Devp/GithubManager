import './CSS/Card.css'
import { Trash2, PenSquare, Copy } from 'lucide-react';


function Card(props){

    return(
        <div className="gitCard">

            <p className='repo-name'>{props.repo_name}</p>
            <p className='repo-desc'>{props.repo_desc}</p>

            <div className='options'>

                <i className="fa-solid fa-trash" onClick={props.onDelete}></i>
                <i className="fa-solid fa-pen-to-square"></i>
                <i className="fa-solid fa-copy"></i>
            </div>
        </div>
    );
}

export default Card;