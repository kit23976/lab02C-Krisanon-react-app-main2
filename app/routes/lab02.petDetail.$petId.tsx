import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export default function HerbDetail() {
    const myParams = useParams();
    const petId = myParams.petId;
    const [petData, setPetData] = useState({
        petName: '',
        petNote: '',
        petType: '',
        petBD: '',
        petOwner: ''
    });

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetch(`/api/getPet/${petId}`); 
                if (response.ok) {
                    const petJson = await response.json();
                    setPetData(petJson); 
                    console.log(petJson);
                } else {
                    alert('[ERR] Failed to load data.');
                }
            } catch (error) {
                alert('[ERR] An error occurred while loading the data.');
            }
        };

        fetchPetData().catch(console.error);
    }, [petId]); 

    return (
        <div className="m-3">
            <a href='/lab02/petLists'>[ ข้อมูลสัตว์เลี้ยง ]</a>
            <h1 className="font-bold">รายละเอียดสัตว์เลี้ยง</h1>
            {
                <div key={petId}>
                    <div className="font-bold p-2 m-2 border-2 rounded-lg">
                        ชื่อสัตว์เลี้ยง: {petData.petName}<br />
                        รายละเอียด: {petData.petNote}<br />
                        ประเภท: {petData.petType}<br />
                        วันเกิด: {petData.petBD}<br />
                        เจ้าของ: {petData.petOwner}<br />
                    </div>
                </div>
            }
            <a href='/lab02/petLists'>[ ย้อนกลับ ]</a>
        </div>
    );
}
