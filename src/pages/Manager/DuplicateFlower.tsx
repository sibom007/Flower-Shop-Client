import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redex/hook";
import { selectCurrentUser } from "../../redex/store";
import { useAddflowerMutation, useSingleflowerByIdQuery } from "../../redex/feature/flower/flowerApi";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";


const DuplicateFlower = () => {
    const user = useAppSelector(selectCurrentUser);
    const params = useParams()
    const navigate = useNavigate()
    const { data: SingleFlower } = useSingleflowerByIdQuery(params.FlowerId)
    const { register, handleSubmit } = useForm({ values: SingleFlower?.data[0] });
    const [addflower, { status, isLoading }] = useAddflowerMutation();


    const onSubmit = async (data: FieldValues) => {
        const Dataneedbacend = {
            name: data.name,
            createdBy: user?._id,
            color: data.color,
            price: parseInt(data.price),
            quantity: parseInt(data.quantity),
            bloomDate: data.bloomDate,
            type: data.type,
            size: data.size,
            fragrance: data.fragrance,
            Fpoint: parseInt(data.Fpoint)
        };

        await addflower(Dataneedbacend);
        if (isLoading === true) {
            toast.loading("Loding ...");
        }
        if (status === "uninitialized") {
            toast.success("Flower has Add")
            navigate("/manager/flowerinventory")
        }
        if (status === "rejected") {
            toast.error("Name Should be unick")
        }



    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 h-screen">
                <h1 className="text-center text-xl font-semibold space-y-5 mt-5 mb-5 md:text-2xl">
                    Duplicate a Flower
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-24 ">
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="name"
                        required
                    />
                    <input
                        {...register("color", { required: true })}
                        type="text"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="color"
                        required
                    />
                    <input
                        {...register("type", { required: true })}
                        type="text"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="type"
                        required
                    />

                    <input
                        {...register("fragrance", { required: true })}
                        type="text"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="fragrance"
                        required
                    />
                    <input
                        {...register("price", { required: true })}
                        type="number"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="price"
                        required
                    />
                    <input
                        {...register("quantity", { required: true })}
                        type="text"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="quantity"
                        required
                    />
                    <input
                        {...register("bloomDate", { required: true })}
                        type="date"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="Bloom Date"
                        required
                    />
                    <input
                        {...register("Fpoint", { required: true })}
                        type="number"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
                        placeholder="Fpoint"
                        required
                    />
                    <select
                        className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        {...register("size")}
                    >
                        <option value="big">Big</option>
                        <option value="medium">Medium</option>
                        <option value="small">Small</option>
                    </select>
                </div>
                <div className="mx-24">
                    <button className="p-3 mt-4 w-full text-lg text-white font-semibold rounded-lg bg-yellow-400 hover:bg-yellow-500 duration-200 active:translate-x-3  active:translate-y-3">
                        <input type="submit" value={"Submit"} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DuplicateFlower;
