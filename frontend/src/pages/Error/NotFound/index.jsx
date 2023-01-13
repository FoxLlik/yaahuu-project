
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "components/shared/NcImage/NcImage";
import I404Png from "images/404.png";

export default function NotFound()
{
    return (
        <div className="nc-Page404">
            <Helmet>
            <title>404 || Ciscryp React Template</title>
            </Helmet>
            <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
                {/* HEADER */}
                <header className="text-center max-w-2xl mx-auto space-y-2">
                    <NcImage src={I404Png} />
                    <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                        Уучларай хуудас олдсонгүй.{" "}
                    </span>
                    <div className="pt-8">
                    <ButtonPrimary href="/">Return Home Page</ButtonPrimary>
                    </div>
                </header>
            </div>
        </div>
    )
}
