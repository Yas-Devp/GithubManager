import { Menu } from 'lucide-react';
import "./CSS/NavBar.css";


function NavBar (){
    return(
        <div className="nav">
            <Menu className='menu-icon'/>
            <div>
                <p className='name'>Github Manager</p>
                <p className='desc'>Ai-Powered Github Analysis</p>
            </div>
        </div>
    );
}

export default NavBar;