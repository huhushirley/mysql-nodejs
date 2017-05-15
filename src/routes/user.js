import express from 'express';
import db from '../models';


const router = new express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: user info
 *     description: return user info
 *     tags:
 *       - User
 *     parameters:
 *       - name: weChatID
 *         in: query
 *         required: true
 *         description: weChatID
 *         type: string
 *     responses:
 *       200:
 *         description: get user info success
 */
router.get('/', async (req, res, next) => {
  try {
    const user = await db.user.findOne({
      where: { weChatID: req.query.weChatID, }
    });
    if (user) {
      return res.send({ user: {
        name: user.name,
        type: user.type,
        area: user.area,
        schoolName: user.schoolName,
        studentID: user.studentID,
        progress: user.progress,
        sumScore: user.sumScore,
      } });
    }
    next({ msg: 'user is not existed', status: 401 });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: user info
 *     description: save user info
 *     tags:
 *       - User
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         description: 微信id／姓名／所在区／参赛类型／学校名称
 *         schema:
 *           type: object
 *           properties:
 *             weChatID:
 *               type: string
 *               default: 'dgeywfdeferkfjer2912uidewjd'
 *             name:
 *               type: string
 *               default: '小胡'
 *             area:
 *               type: string
 *               default: '徐汇区'
 *             type:
 *               type: string
 *               default: '小学'
 *             schoolName:
 *               type: string
 *               default: '上海师范大学附属中学'
 *             studentID:
 *               type: integer
 *               default: 130154605
 *     responses:
 *       200:
 *         description: save user info success
 */
router.post('/', async (req, res, next) => {
  const { weChatID, name, area, type, schoolName, studentID } = req.body;
  try {
    let user = await db.user.findOne({
      where: { weChatID }
    });
    if (!user) {
      user = db.user.build({
        weChatID,
        name,
        area,
        type,
        schoolName,
        studentID,
      });
      let school = await db.school.findOne({
        where: { name: schoolName }
      });
      if (!school) {
        school = db.school.build({
          name: schoolName,
        });
        await school.save();
      }
      await user.save();
      return res.send({ msg: '用户信息保存成功', user });
    }
    next({ msg: 'user info can not modified', status: 403 });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /user:
 *   put:
 *     summary: user info
 *     description: alter user info
 *     tags:
 *       - User
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         description: wechatID & schoolName
 *         schema:
 *           type: object
 *           properties:
 *             wechatID:
 *               type: string
 *               default: 'dgeywfdeferkfjer2912uidewjd'
 *             schoolName:
 *               type: string
 *               default: '上海交大附小'
 *     responses:
 *       200:
 *         description: alter user info success
 */
router.put('/', async (req, res, next) => {
  const { wechatID, schoolName } = req.body;
  try {
    const user = await db.user.findOne({
      where: { wechatID }
    });
    if (user) {
      let school = await db.school.findOne({
        where: { name: schoolName }
      });
      if (!school) {
        school = db.school.build({
          name: schoolName,
        });
        await school.save();
      }
      user.schoolName = schoolName;
      await user.save();
      return res.send({ msg: '用户信息修改成功' });
    }
    next({ msg: 'user is not existed', status: 401 });
  } catch (err) {
    next(err);
  }
});

export default router;
