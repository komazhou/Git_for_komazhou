-- 获取用户目录
local function getCurrentDir()
  function sum(a, b)
    return a + b
  end
  local info = debug.getinfo(sum)
  local path = info.source
  path = string.sub(path, 2, -1) -- 去掉开头的"@"
  path = string.match(path, "^(.*[\\/])") -- 捕获目录路径
  local spacer = string.match(path,"[\\/]")
  path=string.gsub(path,'[\\/]',spacer)  .. ".." .. spacer 
  return path
end

-- 词尾输入--保存词条到英文用户词库
local function set_user_date(input, seg, env)
if ( string.sub(input,-1)  == "+") then
    local inpu = string.gsub(input,"[+]+$","")
    local lower = string.sub(string.lower(inpu),1,4) --转换大写字母为小写,并提取前4位

  if (string.len(inpu) > 1 and string.sub(input,1,1) ~= "+") then
    if ( string.sub(input,-2)  == "++") then
      ppath = getCurrentDir() .. "Extend_dict/luna_pinyin.cn_en.dict.yaml"
      local file = io.open(ppath,"a")--"a" 追加写入模式。
      file:write("\n" .. inpu .. "\t" .. lower .. "\t100")
      file:close()
      yield(Candidate("pin", seg.start, seg._end, inpu , " 已保存"))
    else
      yield(Candidate("pin", seg.start, seg._end, inpu , " -保存"))
    end
  end
  end
end

return set_user_date