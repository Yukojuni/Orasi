"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all max-w-3xl mx-auto",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center items-center relative py-2",
        caption_label: "text-lg font-bold text-[#4B4B4B]",
        nav: "flex items-center space-x-2",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-[#F9F9F9] p-0 text-[#4B4B4B] hover:bg-[#4E3AC4] hover:text-white transition-colors"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse mt-2",
        head_row: "flex",
        head_cell: "flex-1 text-center font-semibold text-gray-500",
        row: "flex w-full mt-1",
        cell: "flex-1 h-10 w-10 text-center rounded-md mx-0.5 relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-medium text-gray-700 hover:bg-[#f8ec24] hover:text-black transition-colors"
        ),
        day_selected:
          "bg-[#4E3AC4] text-white hover:bg-[#3d2ea3] focus:bg-[#3d2ea3] focus:text-white",
        day_today: "border border-[#4E3AC4] text-[#4E3AC4]",
        day_outside: "text-gray-300",
        day_disabled: "text-gray-400 opacity-50",
        day_range_middle: "bg-[#4E3AC4]/30 text-[#4E3AC4]",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
