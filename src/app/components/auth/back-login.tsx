import { ArrowLeft } from "lucide-react"

type BackLoginProps = {
    text: string
    onClick: () => void
}

function BackLogin({ text, onClick }: BackLoginProps) {


    return (


        <p className="text-center text-sm text-muted-foreground">
            <button onClick={onClick} className="hover:text-primary flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2 inline-flex " />
                {text}
            </button>
        </p>
    )
}
export default BackLogin