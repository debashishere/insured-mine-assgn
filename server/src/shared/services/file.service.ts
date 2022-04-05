import { extname } from 'path/posix';
import { diskStorage } from 'multer'


export const intercept = () => ({
  storage: diskStorage({
    destination: './csv',
    filename: (req, file, cb) => {
      const name =
        Array(32).fill(null)
          .map(
            () => (Math.round(Math.random() * 16)).toString(16)
          ).join('')
      cb(null, `${name}${extname(file.originalname)}`)
    }
  })
})

