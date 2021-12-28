
const students = require('../data/student');


class StudentController {

    async index(req, res) {

      const murid = await students.all()
   
              const response = {
                "message": "get all students",
                "data": murid
              };

              res.json(response);
       
    }

    async show(req, res) {
        try {
          const { id } = req.params;
          const detailStudent = await students.show(id);
    
        
          if (detailStudent.length < 1) {
            const data = {
              message: "Student tidak ditemukan",
            };
            return res.status(404).json(data);
          }
    
          const data = {
            message: "Menampilkan detail student",
            data: detailStudent[0],
          };
          return res.status(200).json(data);
        } catch (err) {
          return res.status(500).json({
            message: "err: " + err.message,
          })
        }
      }

      async store(req, res) {
        try {
          const { nama, nim, email, jurusan } = req.body;

          if (typeof nama == 'undefined') {
            const data = {
              message: `field nama is required`,
            };
            return res.status(400).json(data);  
          }
        
          if (typeof nim == 'undefined') {
            const data = {
              message: `field nim is required`,
            };
            return res.status(400).json(data);  
          }
          
          if (typeof email == 'undefined') {
            const data = {
              message: `field email is required`,
            };
            return res.status(400).json(data);  
          }
        
          if (typeof jurusan == 'undefined') {
            const data = {
              message: `field jurusan is required`,
            };
            return res.status(400).json(data);  
          }
    
          const dataStudent = {
            nama,
            nim,
            email,
            jurusan,
          };
          const insertStudent = await students.create(dataStudent);
          const detailDataStudent = await students.show(insertStudent.insertId);
    
          const data = {
            message: `Menambahkan data students`,
            data: detailDataStudent[0],
          };
    
          return res.status(201).json(data);
        } catch (err) {
          return res.status(500).json({
            message: "err: " + err.message,
          })
        }
      }
    
}

const object = new StudentController();

module.exports = object;