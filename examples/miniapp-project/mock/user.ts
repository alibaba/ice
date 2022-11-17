import type { Request, Response } from '@ice/app';

export default {
  'GET /api/users': ['a', 'b'],
  'POST /api/users/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    res.send({ id: id });
  },
};
