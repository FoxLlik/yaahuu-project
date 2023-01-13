import { Popover, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavigationItem = ({ menuItem }) => {
	const [menuCurrentHovers, setMenuCurrentHovers] = useState([]);

	// CLOSE ALL MENU OPENING WHEN CHANGE HISTORY
	const locationPathName = useLocation().pathname;
	useEffect(() => {
		setMenuCurrentHovers([]);
	}, [locationPathName]);

	const onMouseEnterMenu = (id) => {
		setMenuCurrentHovers((state) => [...state, id]);
	};

	const onMouseLeaveMenu = (id) => {
		setMenuCurrentHovers((state) => {
			return state.filter((item, index) => {
				return item !== id && index < state.indexOf(id);
			});
		});
	};

	// ===================== MENU MEGAMENU =====================

	// ===================== MENU DROPDOW =====================
	const renderDropdownMenu = (menuDropdown) => {
		const isHover = menuCurrentHovers.includes(menuDropdown.id);
		return (
			<Popover
				as="li"
				className="menu-item menu-dropdown relative"
				onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
				onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
			>
				{() => (
					<>
						<Popover.Button as={"div"}>
							{renderMainItem(menuDropdown)}
						</Popover.Button>
						<Transition
							as={Fragment}
							show={isHover}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								static
								className="sub-menu absolute transform z-10 w-56 pt-3 left-0"
							>
								<ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
									{menuDropdown.children?.map((i) => {
										if (i.type) {
											return renderDropdownMenuNavlinkHasChild(
												i
											);
										} else {
											return (
												<li key={i.id} className="px-2">
													{renderDropdownMenuNavlink(
														i
													)}
												</li>
											);
										}
									})}
								</ul>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		);
	};

	const renderDropdownMenuNavlinkHasChild = (item) => {
		const isHover = menuCurrentHovers.includes(item.id);
		return (
			<Popover
				as="li"
				key={item.id}
				className="menu-item menu-dropdown relative px-2"
				onMouseEnter={() => onMouseEnterMenu(item.id)}
				onMouseLeave={() => onMouseLeaveMenu(item.id)}
			>
				{() => (
					<>
						<Popover.Button as={"div"}>
							{renderDropdownMenuNavlink(item)}
						</Popover.Button>
						<Transition
							as={Fragment}
							show={isHover}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								static
								className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
							>
								<ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
									{item.children?.map((i) => {
										if (i.type) {
											return renderDropdownMenuNavlinkHasChild(
												i
											);
										} else {
											return (
												<li key={i.id} className="px-2">
													{renderDropdownMenuNavlink(
														i
													)}
												</li>
											);
										}
									})}
								</ul>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		);
	};

	const renderDropdownMenuNavlink = (item) => {
		return (
			<NavLink
				end
				target={item.targetBlank ? "_blank" : undefined}
				rel="noopener noreferrer"
				className={({ isActive }) =>
					`flex items-center py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 ${
						isActive
							? "font-medium text-neutral-900 dark:text-neutral-100"
							: "font-normal text-neutral-6000 dark:text-neutral-400"
					}`
				}
				to={{
					pathname: item.href || undefined,
				}}
			>
				{item.name}
				{item.type && (
					<FiChevronDown
						className="ml-2 h-4 w-4 text-neutral-500"
						aria-hidden="true"
					/>
				)}
			</NavLink>
		);
	};

	// ===================== MENU MAIN MENU =====================
	const renderMainItem = (item) => {
		return (
			<NavLink
				end
				target={item.targetBlank ? "_blank" : undefined}
				rel="noopener noreferrer"
				className={({ isActive }) =>
					`inline-flex items-center text-sm xl:text-base py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 ${
						isActive
							? "font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800"
							: "font-normal text-neutral-700 dark:text-neutral-300"
					}`
				}
				to={{
					pathname: item.href || undefined,
				}}
			>
				{item.name}
				{item.type && (
					<FiChevronDown
						className="ml-1 -mr-1 h-4 w-4 text-neutral-400"
						aria-hidden="true"
					/>
				)}
			</NavLink>
		);
	};

	switch (menuItem.type) {
		case "dropdown":
			return renderDropdownMenu(menuItem);
		default:
			return <li className="menu-item">{renderMainItem(menuItem)}</li>;
	}
};
// Your component own properties

export default NavigationItem;
