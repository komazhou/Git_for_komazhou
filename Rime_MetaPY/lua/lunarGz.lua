?------------------------------------
------wirting by 98wubi Group-------
------http://98wb.ys168.com/--------
------------------------------------

--����ת��֧��ʵ��
--[[��֧����������������ʱ�̣�ע�⣬���������յ�0ʱ��Ϊ���֧����㣻���¸�֧��ʮ����ʱ�̣�ע�⣬��һ���Ǹ������յ�0ʱ��
--]]
--require('common')
require("ace/lunarJq")

GanZhiLi = {
}

--������֧������
function GanZhiLi:new()
    local o = {}
    setmetatable(o, self)
    self.__index = self
    o:setTime(os.time())
    return o
end

--��offset����ֵת��Ϊ�ض�ƫ���µ�����������ʼ����ƫ����������
function GanZhiLi:calRound(start, offset, round)
    if start > round or start <=0 then return nil end --��������
    offset = math.floor(math.fmod(start+offset, round))
    if offset >=0 then
        if offset==0 then offset=round end
        return offset
    else
        return round + offset
    end
end

--����ѭ����
function calR2(n, round)
    local x = math.floor(math.fmod(n,round))
    if x==0 then x=round end
    return x
end

--��������ת����֧���Ĺ���ʱ��
function GanZhiLi:setTime(t)
    self.ttime = t
    self.tday = os.date('*t', t)
    --for k,v in pairs(self.tday) do
    --    print(k,v)
    --end
    --��ȡ��������ĸ�֧
    self.jqs = getYearJQ(self.tday.year)
    self.ganZhiYearNum = self:calGanZhiYearNum()
    if self.ganZhiYearNum ~= self.tday.year then
        --����ڽ����ϻ�û���������������û����֧���Ľ��꣬��Ҫȡ��֧������ݵ�24����
        self.jqs = getYearJQ(self.ganZhiYearNum)
    end
    self.ganZhiMonNum = self:calGanZhiMonthNum()
    self.curJq = self:getCurJQ()

end

function GanZhiLi:getCurJQ()
    --for i=1,24 do
    --    local x = os.date('*t', self.jqs[i])
    --    print(x.year, x.month, x.day, x.hour, x.min, x.sec)
    --end
    local x = 0
    if self.ttime < self.jqs[1] then return nil end --������������ˣ�
    for i=1,23 do
        if self.jqs[i] <= self.ttime and self.jqs[i+1] > self.ttime then x=i break end
    end
    if x==0 then x=24 end
    return x --����������Ϊ��ʼ���1�Ľ���
end


--���ݹ�����ݺͽ��������֧�������
function GanZhiLi:calGanZhiYearNum()
    if (self.ttime < self.jqs[1]) then return self.tday.year -1
    else return self.tday.year end
end

--��ȡ��֧�·�
function GanZhiLi:calGanZhiMonthNum()
    if self.ttime < self.jqs[1] then return nil end
    local x = 0
    if self.ttime < self.jqs[1] then return nil end --������������ˣ�
    for i=1,23 do
        if self.jqs[i] <= self.ttime and self.jqs[i+1] > self.ttime then x=i end
    end
    if x==0 then x=24 end
    return math.floor((x+1)/2)
end


--������ĸ�֧��ţ�1Ϊ���ӡ�����
function GanZhiLi:getYearGanZhi()
    local jiaziYear = 1984 --������
    --print(self.ganZhiYearNum)
    local yeardiff = self.ganZhiYearNum - jiaziYear
    return self:calRound(1,yeardiff,60)
end

--���������ɺţ�1Ϊ��
function GanZhiLi:getYearGan()
    local idx = self:getYearGanZhi()
    return self:calR2(idx,10)
end

--������ĵ�֧�ţ�1Ϊ��
function GanZhiLi:getYearZhi()
    local idx = self:getYearGanZhi()
    return self:calR2(idx,12)
end

--�����µĸ�֧��
function GanZhiLi:getMonGanZhi()
    local ck ={year=2010,month=2,day=4,hour=6,min=42,sec=0}
    local x = os.time(ck) --�ο��£�����ʱ��2010-2-4 6:42:00��Ӧ�ĸ�֧���Ϊ15
    local ydiff = self.ganZhiYearNum - ck.year
    local mdiff = self.ganZhiMonNum-1
    if ydiff >=0 then
        mdiff = ydiff*12 + mdiff
    else
        mdiff = (ydiff+1)*12 + mdiff -12
    end
    return self:calRound(15,mdiff, 60)
end


function GanZhiLi:getMonGan()
    local idx = self:getMonGanZhi()
    return self:calR2(idx,10)
end

function GanZhiLi:getMonZhi()
    local idx = self:getMonGanZhi()
    return self:calR2(idx,12)
end

--�����յĸ�֧�ţ����Ӵ�1��ʼ
function GanZhiLi:getDayGanZhi()
    local DAYSEC = 24*3600
    local jiaziDayTime = os.time({year=2012, month=8, day=30, hour=23, min=0,sec=0})
    local daydiff = math.floor((self.ttime - jiaziDayTime)/DAYSEC)
    return self:calRound(1,daydiff,60)
end

--�����յ���ɺ�
function GanZhiLi:getDayGan()
    local idx = self:getDayGanZhi()
    return self:calR2(idx,10)
end

--�����յĵ�֧��
function GanZhiLi:getDayZhi()
    local idx = self:getDayGanZhi()
    return self:calR2(idx,12)
end

--����ʱ���ĸ�֧��
function GanZhiLi:getHourGanZhi()
    local SHICHENSEC=3600*2
    local jiaziShiTime = os.time({year=2012, month=8, day=30, hour=23, min=0, sec=0})
    local shiDiff = math.floor((self.ttime - jiaziShiTime)/SHICHENSEC)
    return self:calRound(1,shiDiff,60)
end

--����ʱ�ɺ�
function GanZhiLi:getShiGan()
    local idx = self:getHourGanZhi()
    return self:calR2(idx,10)
end

--����ʱ֧��
function GanZhiLi:getShiZhi()
    local idx = self:getHourGanZhi()
    return self:calR2(idx,12)
end





--====================�����ǲ��Դ���=============

local jqB={ --������
"����","��ˮ","����","����","����","����","����","С��","â��","����","С��","����","����","����","��¶",
"���","��¶","˪��","����","Сѩ","��ѩ","����","С��","��",}
--���
local tiangan = {'��', '��', '��', '��', '��', '��', '��', '��', '��', '��'}

--��֧
local dizhi = {'��', '��', '��', 'î', '��', '��', '��', 'δ', '��', '��', '��', '��'}


--������ʮ������ţ�������ʮ�����ַ���,���Ӵ�1��ʼ
local function get60JiaZiStr(i)
local gan = i % 10
        if gan == 0  then gan = 10 end
        local zhi = i % 12
        if zhi == 0 then zhi = 12 end
        return tiangan[gan]..dizhi[zhi]
end

function lunarJzl(y)
    local x,yidx,midx,didx,hidx
    y=tostring(y)
    x = GanZhiLi:new()
    x:setTime(os.time({year=tonumber(y.sub(y,1,4)),month=tonumber(y.sub(y,5,-5)), day=tonumber(y.sub(y,7,-3)),hour=tonumber(y.sub(y,9,-1)),min=4,sec=5}))
    yidx = x:getYearGanZhi()
    midx = x:getMonGanZhi()
    didx = x:getDayGanZhi()
    hidx = x:getHourGanZhi()
    GzData= get60JiaZiStr(yidx) .. '��' .. get60JiaZiStr(midx) .. '��' .. get60JiaZiStr(didx) .. '��' .. get60JiaZiStr(hidx) .. 'ʱ'
    --print('��֧:'  .. GzData)
    return GzData
end

--����
--print(lunarJzl(os.date("%Y%m%d%H")))