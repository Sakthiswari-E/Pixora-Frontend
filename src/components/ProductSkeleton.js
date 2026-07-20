function ProductSkeleton() {
    return (
        <div
            className="
        bg-[#111]
        rounded-3xl
        overflow-hidden
        border
        border-white/10
        animate-pulse
        shadow-lg
      "
        >
            {/* Image */}
            <div className="h-60 bg-gray-800"></div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Category */}
                <div className="h-5 w-24 bg-gray-700 rounded-full"></div>

                {/* Title */}
                <div className="h-6 bg-gray-700 rounded w-4/5"></div>

                {/* Rating */}
                <div className="h-4 bg-gray-700 rounded w-20"></div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>

                {/* Price */}
                <div className="h-6 bg-gray-700 rounded w-28"></div>

                {/* Button */}
                <div className="h-12 bg-gray-700 rounded-2xl mt-4"></div>
            </div>
        </div>
    );
}

export default ProductSkeleton;