import React from 'react'

const AlertMessages = ({ messages }) => {
    if (!messages || messages.length === 0) return null

    return (
        <>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`alert login-alerts alert-${msg.tags === 'error' ? 'danger' : msg.tags}`}
                >
                    {msg.text}
                </div>
            ))}
        </>
    )
}

export default AlertMessages
