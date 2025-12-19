import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material"; 

export default function Description({ open, setOpen }) {
    const desc = `
    MC动图网
    万能的蹲起动图，或许这才是真正无国界无障碍交流的符号，以图会友，每个MC玩家都能get到的趣味皮肤图
                    ——————


    mcgif.cn丨1.1
    加入: 扭屁股，挥手等动图生成
    ------------------
        mcgif.cn丨1.2
    diy图片背景及人物大小
    ------------------
        mcgif.cn丨2.0
    MC动图网(不止是动图！)
                    输入id来和名胜古迹来张打卡合影吧~
        ------------------
            mcgif.cn丨2.1
    一个人太孤单，现在输入多人id进行合影生成
    ------------------
        mcgif.cn丨2.2
    pose？老师真的没交过，现在你可以随意调整你皮肤人物肢体，生成更加有趣且美观的图
    ------------------
        以上功能皆为设想，目前还不具备实现条件，欢迎喜欢MC具有开发能力的大佬加入实现更多功能，创造更加有趣的mc动图网。
                    ——————
    mcgif.cn

    `;

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>关于本站</DialogTitle>
            <DialogContent>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                    {desc }
                </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setOpen(false)}>关闭</Button>
            </DialogActions>
        </Dialog>
    )
}