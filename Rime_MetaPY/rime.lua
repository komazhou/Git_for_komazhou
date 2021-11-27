--- 在Rime使用計算器
calculator_translator = require("calculator_translator")

--- 增加首选嵌入式预览
preedit_preview = require("preedit_preview")

--- 增加日期和时间的输入
function date_translator(input, seg)
    ---月份
    local date_m_tab = {'一','二','三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' }
    ---日
    local date_d_tab = {'一','二','三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' , '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一' }
    --- 翻译日期
    if (input == "oriqi") then
        --- Candidate(type, start, end, text, comment)
        yield(Candidate("date", seg.start, seg._end, os.date("%Y年%m月%d日"), ""))  ---效果：2021年02月25日
        yield(Candidate("date", seg.start, seg._end, os.date("%Y-%m-%d"), ""))  ---效果：2021-02-25
        yield(Candidate("date", seg.start, seg._end, os.date("%Y/%m/%d"), ""))  ---效果：2021/02/25
        yield(Candidate("date", seg.start, seg._end, os.date("%Y%m%d"), ""))  ---效果：20210225
        yield(Candidate("date", seg.start, seg._end,date_m_tab[tonumber(os.date("%m"))].."月"..date_d_tab[tonumber(os.date("%d"))].."日",""))  ---输出效果（英文）：二月二十八日
        -- yield(Candidate("date", seg.start, seg._end, os.date("%m-%d"), ""))  ---效果：02-25
        -- yield(Candidate("date", seg.start, seg._end, os.date("%m月%d日"), ""))  ---效果：02月-25日
        -- yield(Candidate("date", seg.start, seg._end, os.date("%m-%d-%Y"), ""))  ---效果：02-25-2021
    end
    --- 翻译春夏秋冬
    if (input == "ojijp") then
        ---方法1，根据月份数字，输出对应数字的数组内容
        local weakTab = {'春天','春天','春天', '夏天', '夏天', '夏天', '秋天', '秋天', '秋天', '冬天', '冬天', '冬天'}
        local weakTab1 = {'Spring','Spring','Spring', 'Summer', 'Summer', 'Summer', 'Autumn', 'Autumn', 'Autumn', 'Winter', 'Winter', 'Winter'}

        yield(Candidate("week", seg.start, seg._end, weakTab[tonumber(os.date("%w")+1)], ""))  ---输出效果：春天
        yield(Candidate("season", seg.start, seg._end, weakTab1[tonumber(os.date("%w")+1)],""))  ---输出效果（英文）：Spring
    end
    --- 翻译时间
    if (input == "ouijm") then
        --- Candidate(type, start, end, text, comment)
        yield(Candidate("time", seg.start, seg._end, os.date("%H:%M"), ""))  ---效果：23:52
        -- yield(Candidate("time", seg.start, seg._end, os.date("%Y%m%d%H%M%S"), ""))   ---效果：20210225235334
        -- yield(Candidate("time", seg.start, seg._end, os.date("%H:%M:%S"), ""))  ---效果：23:53:58
        -- yield(Candidate("time", seg.start, seg._end, os.date("%H点%M分%S秒"), ""))  ---效果：23:53:58
    end
    -- @JiandanDream
    -- https://github.com/KyleBing/rime-wubi86-jidian/issues/54
    if (input == "oxkqi") then
        ---根据星期的数字，输出对应数字的数组内容
        local weakTab = {'日', '一', '二', '三', '四', '五', '六'}
        local weakTab2 = {'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'}
        local weakTab3 = {'日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'}
        local weakTab4 = {'にちようび', 'げつようび', 'かようび', 'すいようび', 'もくようび', 'きんようび', 'どようび'}
        local weakTab5 = weakTab4[tonumber(os.date("%w")+1)]

        yield(Candidate("week", seg.start, seg._end, "星期"..weakTab[tonumber(os.date("%w")+1)], ""))  ---拼接效果：星期四
        yield(Candidate("week", seg.start, seg._end, "周"..weakTab[tonumber(os.date("%w")+1)], ""))  ---拼接效果：周四
        yield(Candidate("week", seg.start, seg._end, weakTab2[tonumber(os.date("%w")+1)], ""))  ---效果（英文）：Sunday
        yield(Candidate("week", seg.start, seg._end, weakTab3[tonumber(os.date("%w")+1)], weakTab5))  ---效果（日文）：日曜日

    end
end

