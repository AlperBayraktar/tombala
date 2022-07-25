const JoinLobbyForm = () => {
    return (
        <div className="form">
            <h2 className="form-title" style={{ marginTop: "32px" }}>
                Lobiye Katıl
            </h2>

            <div className="form-group">
                <p className="form-group-title">Nickname</p>
                <input
                    type="text"
                    className="input"
                    placeholder="Sınır 16 karakter"
                    maxLength={16}
                />
            </div>
            <div className="form-group">
                <p className="form-group-title">Lobi İsmi</p>
                <input
                    type="text"
                    className="input"
                    placeholder="Sınır 16 karakter"
                    maxLength={16}
                />
            </div>
            <div className="form-group">
                <p className="form-group-title">Şifre</p>
                <input className="input" maxLength={16} />
            </div>
            <div className="form-group">
                <button className="btn submit-btn rounded-btn">Katıl</button>
            </div>
        </div>
    );
};

export default JoinLobbyForm;
