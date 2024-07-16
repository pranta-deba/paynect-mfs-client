import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

const Solutions = () => {
    return (
        <div>
            <SectionTitle title='All financial solutions in one platform' />
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-6 mt-8'>
                <div className="card">
                    <figure className=" md:h-[250px] px-10">
                        <img
                            src="./1.svg" className=' object-cover'/>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Payment</h2>
                        <p>Pay online and scan QR across the country, make the fastest payment at paynect</p>
                        <div className="card-actions">
                            <button className="text-[#e52165]">Learn more</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <figure className=" md:h-[250px] px-10">
                        <img
                            src="./2.svg" className=' object-cover'/>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Mobile Recharge</h2>
                        <p>Recharge on any number, with best offers</p>
                        <div className="card-actions">
                            <button className="text-[#e52165]">Learn more</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <figure className=" md:h-[250px] px-10">
                        <img
                            src="./3.svg" className=' object-cover'/>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Send Money</h2>
                        <p>Send money from paynect to any number, instantly</p>
                        <div className="card-actions">
                            <button className="text-[#e52165]">Learn more</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <figure className=" md:h-[250px] px-10">
                        <img
                            src="./4.svg" className=' object-cover'/>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Cash Out</h2>
                        <p>Withdraw money at the country's largest network of agents and ATMs</p>
                        <div className="card-actions">
                            <button className="text-[#e52165]">Learn more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Solutions;