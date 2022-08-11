const ChatForm = ({ className, children }) => {
    return (
        <div className = {`chat-form ${className}`}>
            <form>
                <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." value="" />
                <button type="submit" disabled="" className="btn btn-group-vertical">Отправить</button>
            </form>
        </div>
    );
}

export default ChatForm;
