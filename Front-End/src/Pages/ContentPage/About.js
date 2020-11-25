import { BrowserRouter as Router, Route, Link, NavLink , Switch} from "react-router-dom";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
export default function About(props) {

    function renderComponent()
    {
        switch (props.value) {
            case 1:
                <Page1/>
                break;

                case 2:
                    <Page2/>
                    break;
                    case 3:
                        <Page3/>
                        break;
        
            default:
                <Page1/>
                break;
        }
    }


    return (
        <div>
            {renderComponent()}
      </div>
    );
}