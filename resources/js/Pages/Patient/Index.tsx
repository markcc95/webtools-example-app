import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import route from "ziggy-js";
import SearchInput from '@/Components/SearchInput';
import Pagination from '@/Components/Pagination';
import {Resource} from "@/Types/Resource";
import {Patient} from "@/Types/Patient";
import {ResourceUrl} from "@/Types/ResourceUrl";

interface PatientIndexProps {
    patients: Array<Resource<Patient>>;
    resourceUrls: Array<ResourceUrl>;
}

const Index = (props: PatientIndexProps) => {
    const [isDisabledPrevBtn, setIsDisabledPrevBtn] = useState(true);
    const [isDisabledNextBtn, setIsDisabledNextBtn] = useState(true);

    useEffect(() => {
        setIsDisabledNextBtn(props.resourceUrls[1] == undefined)
        setIsDisabledPrevBtn(props.resourceUrls[2] == undefined)
    }, [props.resourceUrls]);
    
    const onHandleChange = (e:string) => {
        router.get("patient", {"name": e}, {preserveState: true});
    };

    const handlePaginationBtnClick = (btnType:String) => {
        var url = "";
        switch (btnType) {
            case "NEXT":
                url = props.resourceUrls[1].url;
                break;
            case "PREV":
                url = props.resourceUrls[2].url;
                break;
        }

        router.get("patient", {"url": url}, {preserveState: true});
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Patients</h2>}
        >
            <Head title="Patients"/>

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SearchInput
                        id="search-patient"
                        className="block w-full"
                        handleChange={onHandleChange}
                    />
                    
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead
                                className="text-xs uppercase ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Given Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Family Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.patients && props.patients.map(patient => {
                                return <tr key={patient.resource.id} className="bg-white border-b" id={patient.resource.id}>
                                    <th scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap">
                                        {patient.resource.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {patient?.resource?.name?.[0]?.given || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient?.resource?.name?.[0]?.family || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={route('patient.show', patient.resource.id)}>View</Link>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    isDisabledPrevBtn={isDisabledPrevBtn}
                    isDisabledNextBtn={isDisabledNextBtn}
                    handlePrevBtnClick={() => handlePaginationBtnClick("PREV")} 
                    handleNextBtnClick={() => handlePaginationBtnClick("NEXT")} 
                />
            </div>

        </AuthenticatedLayout>
    );
}

export default Index;
