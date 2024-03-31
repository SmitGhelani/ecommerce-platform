import Link from "next/link";

const Orders = () => {
    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-md rounded my-6">
                <table className="text-left w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Order Number</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Total</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Items</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light">123456</td>
                            <td className="py-4 px-6 border-b border-grey-light">01 Jan 2024</td>
                            <td className="py-4 px-6 border-b border-grey-light">£150.00</td>
                            <td className="py-4 px-6 border-b border-grey-light">3 Items</td>
                            <td className="py-4 px-6 border-b border-grey-light">
                                <Link href="/order-details" className="text-blue-500 hover:text-blue-800">View</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders;