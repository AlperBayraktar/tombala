import "./css/LobbyCreationMenu.css";

export default function LobbyCreationMenu() {
    return (
        <div className="lobby-creation-menu">
            <div className="lobby-creation-page-content form">
                <h1 className="lobby-creation-page-title">Tombala!</h1>
                <div className="form-content">
                    <h1 className="form-title">Lobi Oluştur</h1>
                    <div className="lobby-creation-form-group form-group">
                        <p className="form-group-title">Nickname</p>
                        <input
                            type="text"
                            placeholder="Nickname"
                            className="form-group-input"
                        />
                    </div>

                    <div className="lobby-creation-form-group form-group">
                        <p className="form-group-title">Lobi ismi</p>
                        <input
                            type="text"
                            placeholder="Lobi ismi"
                            className="form-group-input"
                        />
                    </div>

                    <div className="lobby-creation-form-group form-group">
                        <button className="btn form-submit">
                            Lobi Oluştur
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
