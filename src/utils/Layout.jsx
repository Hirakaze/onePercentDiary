export default function Layout(props){

    const {children} = props

    const header = (
        <header>

            <h1>onePercent Diary</h1>
            <p>Make you learn 1% more than yesterday</p>

        </header>
        
    )

    const footer =(
        
        <footer>
            <p>Built by <a href="https://github.com/Hirakaze" target="_blank">Hirakaze</a></p>
            <p>Styled with FantaCSS</p>
        </footer>
    )

    return(
        <>
            {header}
            {children}
            {footer}
        </>
    )
}