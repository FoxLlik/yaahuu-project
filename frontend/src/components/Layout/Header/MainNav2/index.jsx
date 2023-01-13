
import Logo from "components/shared/Logo";
import MenuBar from "components/shared/MenuBar";
import SwitchDarkMode from "components/shared/SwitchDarkMode";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import ButtonSecondary from "components/shared/Button/ButtonSecondary";
import Navigation from "components/shared/Navigation/Navigation";

export default function MainNav2()
{
    return (
        <div className={`nc-MainNav2 relative z-10 ${"onTop "}`}>
			<div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
				<div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
					<Logo />
					<div className="hidden sm:block flex-grow max-w-xs"></div>
				</div>
				<div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
					<div className="hidden items-center xl:flex space-x-2">
						<Navigation />
						<div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000"></div>
						<SwitchDarkMode />
						<ButtonPrimary
							href={"/sign/in/"}
							sizeClass="px-4 py-2 sm:px-5"
						>
							Нэвтрэх
						</ButtonPrimary>
					</div>
					<div className="flex items-center space-x-1.5 xl:hidden">
						<ButtonPrimary
							href={"/sign/in/"}
							sizeClass="px-4 py-2 sm:px-5"
						>
							Нэвтрэх
						</ButtonPrimary>
						<MenuBar />
					</div>
				</div>
			</div>
		</div>
    )
}
