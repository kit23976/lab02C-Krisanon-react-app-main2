import { useState, useEffect } from "react";

export default function HerbLists() {
    const [loadStatus, setLoadStatus] = useState(true);
    const [petsData, setPetsData] = useState([]); 

    useEffect(() => {
        const fetchPetsData = async () => {
            try {
                const response = await fetch('/api/getPets'); 
                if (response.ok) {
                    const petsJson = await response.json();
                    setPetsData(petsJson); 
                } else {
                    alert('[ERR] Unable to read data.'); 
                }
            } catch (error) {
                alert('[ERR] An error occurred when reading the data.'); 
            } finally {
                setLoadStatus(false); 
            }
        };

        if (loadStatus) {
            fetchPetsData().catch(console.error);
            console.log('Fetching pets data...');
        }
    }, [loadStatus]);

    const handleDelete = (petId) => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/deletePet/${petId}`, {
                    method: 'DELETE', 
                });
                if (response.ok) {
                    const myJson = await response.json();
                    alert(myJson.message); 
                    setLoadStatus(true); 
                } else {
                    alert('[ERR] An error occurred when deleting data.');
                }
            } catch (error) {
                alert('[ERR] An error occurred when deleting the data.'); 
            }
        };

        fetchData(); 
    };

    return (
        <div className="m-3">
            <a href='/lab02/addPet'>[ เพิ่มข้อมูลสัตว์เลี้ยง ]</a> 
            <h1 className="font-bold">รายการสัตว์เลี้ยง</h1>
            {petsData.map((p_item, index) => (
                <div key={index}>
                    <div className="font-bold p-2 m-2 border-2 rounded-lg">
                        ชื่อสัตว์เลี้ยง: {p_item.petName}<br />
                        ประเภท: {p_item.petType}<br />
                        วันเกิด: {p_item.petBD}<br />
                        เจ้าของ: {p_item.petOwner}<br />
                    </div>
                    <div className="p-2 m-2">
                        <a href={`/lab02/petDetail/${p_item.petId}`}>[ รายละเอียด ]</a>
                        <a href={`/lab02/editPet/${p_item.petId}`}>[ แก้ไข ]</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(p_item.petId); }}>[ ลบ ]</a>
                    </div>
                </div>
            ))}
        </div>
    );
}
