export default function AuthorWatermark(){
    return (
        <div className="author__watermark">&copy; Enrique Barboza {(new Date()).getFullYear()}</div>
    )
}