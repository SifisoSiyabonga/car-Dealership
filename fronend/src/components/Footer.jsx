const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white h-[100px] opacity-80 flex items-center justify-center">
            
            <ul className="flex space-x-8">
            🚗 🚗🚗🚗
            
                <li className="hover:text-gray-400 cursor-pointer">About</li>
                <li className="hover:text-gray-400 cursor-pointer">Buy a Car</li>
                <li className="hover:text-gray-400 cursor-pointer">Contact Us</li>
                <li className="text-sm mt-4">
                    &copy; {currentYear}{" "}
                    <a
                        href="https://www.teamtechz.co.za"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-400"
                    >
                       TeamTechz IT Solutions
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
