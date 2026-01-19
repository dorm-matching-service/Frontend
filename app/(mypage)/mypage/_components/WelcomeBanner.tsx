
interface Props{
    name: string,
    department: string,
    age: number,

}

export default function WelcomeBanner({ name, department, age }: Props) {
    return(
        <div className="w-full h-[123px] text-white bg-main rounded-[15px]">
            <p className="text-18 font-bold">{name}님 환영합니다!</p>
            <p className="text-16">{department} {age}</p>
        </div>
    );
}
