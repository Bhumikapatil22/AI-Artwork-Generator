const Footer = () => {
    return (
        <footer className="w-full text-sm text-gray-400 border-t border-gray-800 px-4 py-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
                <p className="flex items-center gap-1">
                    <span>© {new Date().getFullYear()}</span>
                    <span className="font-semibold text-white">AI-Artwork Generator</span>
                </p>
                <p>
                    Designed & Developed by <span className="font-semibold text-white">Bhumika Patil</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer