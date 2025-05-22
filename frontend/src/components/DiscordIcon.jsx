import React from 'react';

const DiscordIcon = ({ size = 24, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 9C18 9 16.5 7.5 13.5 7.5C10.5 7.5 9 9 9 9" />
            <path d="M9 15C9 15 10.5 16.5 13.5 16.5C16.5 16.5 18 15 18 15" />
            <path d="M5.5 15.5C5.5 15.5 5.5 14.5 6.5 13" />
            <path d="M5 13.5C5 13.5 7 16.5 13.5 16.5C20 16.5 22 13.5 22 13.5C22 10 21 6.5 19.5 5C18 3.5 15.5 3 13.5 3C11.5 3 9 3.5 7.5 5C6 6.5 5 10 5 13.5Z" />
            <path d="M5.5 11.5C5.5 11.5 5.5 10.5 6.5 9" />
        </svg>
    );
};

export default DiscordIcon;
