
const SectionTitle = ({ title = 'title' }) => {
    return (
        <div className="mt-8">
            <p className="text-center md:text-4xl text-[#e52165] px-2 mx-auto uppercase font-bold">{title}</p>
        </div>
    );
};

export default SectionTitle;