import Image from "next/image";

interface CategoryProps{
    dataCategory: string;
    setCategory: (category: string) => void;

}

const Categories: React.FC<CategoryProps> = ({dataCategory, setCategory}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12" >
                <div 
                    onClick={() => setCategory('Beach')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'beach' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gary-200 hover:opacity-100`}>
                    <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                    <span className="text-sm">Beach</span>
                </div>
                <div 
                    onClick={() => setCategory('Villas')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Villas' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gary-200 hover:opacity-100`}>
                    <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                    <span className="text-sm">Villas</span>
                </div>
                <div 
                    onClick={() => setCategory('Cabins')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Cabins' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gary-200 hover:opacity-100`}>
                    <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                    <span className="text-sm">Cabins</span>
                </div>
                <div 
                    onClick={() => setCategory('Tiny Homes')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Tiny Homes' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gary-200 hover:opacity-100`}>
                    <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                    <span className="text-sm">Tiny Homes</span>
                </div>
            </div>
        </>
    )
}

export default Categories