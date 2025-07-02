interface CustomButtonProps {
    label :string;
    onClick: () => void;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({label, onClick, className}) => {
    return (
        <div onClick={onClick}  className={`${className} py-4 bg-airbnb text-center hover:bg-airbnb-dark rounded-xl text-white transition cursor-pointer`}>
            {label} 
        </div>
    )
}

export default CustomButton