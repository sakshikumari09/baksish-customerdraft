"use client";
import Image from "next/image";
import logo from "../assets/baksish1.png";
import group from "../assets/Group.svg";
import chefHat from "../assets/Chef Hat Icon.svg";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import border from "../assets/Group_32.png";
import chef from "../assets/iconfood.png";
import heading from "../assets/heading.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyRupee, EditNote, History, ReceiptLong } from "@mui/icons-material";
import LoadingPage from "../loaders/LoadingPage";
import GenerateBillModal from "./ConfirmGenerateBill";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "../not-found";
import { clearCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import LandingLoader from "./LandingLoader";


const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const [name, setname] = useState("")
  const [isOpen, setisOpen] = useState(false);
  const [orderID, setorderID] = useState("")
  const router=useRouter();
  const [isterminated, setisterminated] = useState(false)
  const dispatch = useDispatch();
  const [buttonclicked, setbuttonclicked] = useState(false);

  const disablebutton=()=>{
    setbuttonclicked(true);
  }
  const billgenerationconfirmed=async()=>{
    console.log(orderID)
    if(orderID!="" || orderID!=null){
    const res=await axios.post('/api/generatebill',{order_id:orderID})
    if(res.data.success){
    router.push(
      `/GenerateBill?id=${id}&table=${table_number}&name=${name}`
    )
  }
  else{
    setisOpen(false);
    toast.error("You haven't placed any order yet.")
  }
  }
  else{
    toast.error("Failed to generate bill. Please ask the waiter.")
  }
  setbuttonclicked(false)
  }

  
  useEffect(() => {
    
    const fetchdetails=async()=>{
      const res=await axios.post('/api/fetchrestaurantmenu',{restaurant_id:id})
      //console.log(res.data.data)
      if(res.data.success)
      {
        dispatch(clearCart());
        setname(res.data.data.restaurant_name)
        const order_id=localStorage.getItem('orderId');
        //console.log(order_id);
        if(order_id){
        const resvalid=await axios.post('/api/fetchvalidorder',{order_id})
        //
        console.log(resvalid.data.valid);
        if(resvalid.data.success){
          if(!resvalid.data.valid){
            localStorage.removeItem('orderId');
          }
          else{
            setorderID(order_id);
          }
        }
      }
      }
      else
      {
        setname("notfoundpage")
      }
      setisterminated(true);
    }
    fetchdetails();
  }, [])
  
  if(!name || !isterminated){
    return <div><LandingLoader/></div>
  }


  return (
    <>
    <Toaster/>
      {name && name!="notfoundpage" &&<div className="w-screen min-h-screen  relative bg-gradient-to-bl overflow-hidden  from-[#430123] to-[#5A0132]">
        <Image
          src={border}
          className="  absolute  top-3 left-3 lg:hidden block   h-[93%] w-[94%] "
          alt="bg"
          priority
          width={300}
          height={3000}
        />
        {/*  */}
        <div className="relative h-64 flex justify-center items-center lg:mt-32 mt-10">
          <Image
          alt="heading"
            src={heading}
            height={500}
            width={500}
            className="h-60 w-60 mx-auto  centered-axis-x "
          />
          <h1 className=" tracking-widest absolute text-center -mt-3 poppins-medium uppercase text-white text-2xl ">
            {name}
          </h1>
        </div>
        <div className="flex justify-center  items-center lg:flex-row  flex-col lg:space-y-0 lg:space-x-4 space-y-6 mt-2">
          <button disabled={!isterminated} onClick={()=>window.location=`/PreviousOrders?id=${id}&table=${table_number}&name=${name}`}  className="border-2 poppins-light text-center w-48 z-50 border-[#FFF9EA] bg-[#440129] px-4 rounded-full text-[#FFF9EA] py-3">
          <History/> Previous Orders
          </button>
          <button disabled={!isterminated} onClick={()=>window.location=`/Menu?id=${id}&table=${table_number}&name=${name}`}  className="border-2 text-center poppins-light w-48 border-[#FFF9EA] z-50 bg-[#440129] px-4 rounded-full text-[#FFF9EA] py-3">
            <EditNote/> Place an Order
          </button>
          <button disabled={!isterminated} onClick={()=>{setisOpen(true)}}  className="border-2 cursor-pointer text-center poppins-light w-48 border-[#FFF9EA] bg-[#440129] px-3 z-50 rounded-full text-[#FFF9EA] py-3">
            <ReceiptLong/> Generate my Bill
          </button>
          <button disabled={!isterminated} onClick={()=>window.location=`/Tip?id=${id}&table=${table_number}&name=${name}`}  className="border-2  text-center poppins-light w-48 border-[#FFF9EA] bg-[#440129] px-4 z-50 rounded-full text-[#FFF9EA] py-3">
            <CurrencyRupee/> Treat the Team
          </button>
        </div>
        <Image
          className="absolute z-10  bottom-6 w-[80%]  -right-2 lg:hidden block "
          src={chef}
          alt="bottomimg"
          width={1000}
          height={1000}
        />
        <div className="flex items-center justify-center">
        <div className="absolute text-white bottom-2">powered by BakSISH</div>
        </div>
        <GenerateBillModal
        buttonclicked={buttonclicked}
        disablebutton={disablebutton}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onConfirm={billgenerationconfirmed}
      />
      </div>}
      {name && name=="notfoundpage" &&<div><NotFound/></div>}
    </>
  );
};

export default page;
