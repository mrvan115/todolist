type Props = {
    title: string
    onClick?: () => void
}

export const Button = (props: Props) => {
    return <button onClick={props.onClick}>{props.title}</button>
};
