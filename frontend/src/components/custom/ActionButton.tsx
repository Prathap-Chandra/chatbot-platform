// ActionButton.tsx
interface ActionButtonProps {
    text: string;
}

const ActionButton = ({ text }: ActionButtonProps) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
            {text}
        </button>
    );
};

export default ActionButton;
