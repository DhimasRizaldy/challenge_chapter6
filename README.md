# challenge_chapter6

Link Railway Dev : https://challengechapter6-develop-c447.up.railway.app/
1. create galery :
- POST  https://challengechapter6-develop-c447.up.railway.app/api/v1/galery/
- title : nama_title
- description : deskripsi_isi
- image : "file.jpeg/jpg/png"
  
2. Get All galery :
- GET  https://challengechapter6-develop-c447.up.railway.app/api/v1/galery/
- with pagination
- GET  https://challengechapter6-develop-c447.up.railway.app/api/v1/galery?page=1&limit=3

3. Get Detail galery :
- GET  https://challengechapter6-develop-c447.up.railway.app/api/v1/galery/1

4. Update galery :
- PUT  https://challengechapter6-develop-c447.up.railway.app/api/v1/galery/1    (isi_id galeri nya)
- title : ubah_title
- description : ubah_deskripsi
- image : "file.jpeg/jpg/png"

5. Delete Image galery :
- PUT  https://challengechapter6-develop-c447.up.railway.app/api/v1/deleteImage/1    (isi_id galeri nya)
- image : null

6. Delete galery :
- DELETE  https://challengechapter6-develop-c447.up.railway.app/api/v1/galery/1    (isi_id galeri nya)

Link Railway Prod : https://challengechapter6-production-1abe.up.railway.app/
