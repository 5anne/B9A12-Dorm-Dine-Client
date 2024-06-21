

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div>
            <div className='text-center'>
                <p className='uppercase text-red-900 font-display font-semibold text-lg mt-10'>{subHeading}</p>
                <h1 className="font-semibold text-4xl font-display text-[#123524] border-y-2 border-green-950 py-8 mb-8 mt-4 w-1/3 mx-auto">{heading}</h1>
            </div>
        </div>
    );
};

export default SectionTitle;