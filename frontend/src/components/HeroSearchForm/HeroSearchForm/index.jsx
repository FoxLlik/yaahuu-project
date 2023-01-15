
import NftSearchForm from "../NftSearchForm";

export default function HeroSearchForm({ className = "" })
{
    return (
        <div
			className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
			data-nc-id="HeroSearchForm"
		>
			<NftSearchForm />
		</div>
    )
}
