'use client';
interface MenuLinkProps{
    label:string;
    onClick: () => void
}

const MenuLink : React.FC <MenuLinkProps> = ({label, onClick}) => {
    return (
        <div onClick={onClick} className="px-5 py-4 hover:bg-gray-100 transition rounded-xl">
            {label}
        </div>
    )
}

export default MenuLink