type Props = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button = (props: Props) => {
    return <button className={props.className} onClick={props.onClick}>{props.title}</button>
};
