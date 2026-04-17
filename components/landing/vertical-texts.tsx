import { TextParis } from "../ui";

export function VerticalTexts() {
    return (
                <div className="flex absolute left-50 lg:-left-42 flex-row gap-1.5 md:gap-3 text-white uppercase tracking-widest text-[9px] top-2 lg:text-[11px] font-light z-20">
                  <TextParis as='p' className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-sm md:text-lg">
                    El Sendero Café & Restaurant
                  </TextParis>
                  <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-sm md:text-lg">
                    山の中のバーとレストラン
                  </p>
                  <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-sm md:text-lg">
                    道路咖啡馆和餐厅
                  </p>
                  <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-sm md:text-lg">
                    የበረሃ ካፌ እና ምግብ ቤት
                  </p>
                  <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-sm md:text-lg">
                    مقهى ومطعم الطريق
                  </p>
                </div>
    )
}