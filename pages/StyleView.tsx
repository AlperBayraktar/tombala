import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/style-view.module.css";

const StyleView: NextPage = () => {
    return (
        <div className={styles.page_container}>
            <Link href="#">
                <a className="link">Link tag</a>
            </Link>
            <br />
            <br />
            <button className="btn">Button</button>
            <br />
            <br />
            <button className="btn rounded-btn">Button</button>
            <br />
            <br />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia obcaecati harum nisi maxime inventore earum eligendi
                recusandae ex! Sit dolore facere cupiditate dolor dolorem maxime
                praesentium quae eligendi, voluptate est?
            </p>
            <br />
            <br />
            <h1>Header 1</h1>
            <br />
            <br />
            <h2>Header 2</h2>
            <br />
            <br />
            <h3>Header 3</h3>
            <br />
            <br />
            <h4>Header 4</h4>
            <br />
            <br />
            <h5>Header 5</h5>
            <br />
            <br />
            <h6>Header 6</h6>
            <br />
            <br />
            <h1 className="title">Header 1 (title)</h1>
            <br />
            <br />
            <input type="text" className="input" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="form">
                <h1 className="title form-title">Giriş Yap</h1>
                <div className="form-group">
                    <p className="form-group-title">Username</p>
                    <input
                        type="text"
                        className="input form-group-input"
                        placeholder="yuzırnağme"
                    />
                </div>
            </div>
            <br />
            <br />
            <div className="container">
                <h1 className="title">Container Title</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsa consectetur corrupti, pariatur similique voluptas
                    possimus, eos quis alias consequuntur et rem repudiandae
                    odit. Similique nisi culpa modi possimus, minima sequi!
                </p>
            </div>
        </div>
    );
};

export default StyleView;
