

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div>
            <div className='text-center'>
                <p className='uppercase text-red-900 font-display font-semibold text-xs md:text-sm lg:text-lg pt-8 md:mt-10'>{subHeading}</p>
                <h1 className="font-semibold md:text-2xl lg:text-4xl font-display text-[#123524] border-y-2 border-dashed border-green-950 py-8 mb-8 mt-4 w-1/2 mx-auto">{heading}</h1>
            </div>
        </div>
    );
};

export default SectionTitle;