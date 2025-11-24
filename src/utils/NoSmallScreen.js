const NoSmallScreen = () => {
    return (
        <div className="flex-vertical-center" style={{ height: '100vh', padding: 25, lineHeight: 1.6, textAlign: 'center' }}>
            <h1>
                Ce jeu doit être joué sur un écran avec une résolution de 1200px de largeur minimum. 
            </h1>
        </div>
    );
};

export default NoSmallScreen;