let count = 0;
let selectedRow = null; 

// Hàm xử lý dữ liệu
function handleData() {
    const name = document.getElementById('fullName').value;
    const year = document.getElementById('birthYear').value;
    const country = document.getElementById('country').value;
    
    const hobbies = [];
    document.querySelectorAll('.hobby:checked').forEach((checkbox) => {
        hobbies.push(checkbox.value);
    });

    if (!name || !year || !country || hobbies.length === 0) {
        alert("Vui lòng điền đầy đủ và chọn sở thích!");
        return;
    }

    if (selectedRow === null) {
        // CHẾ ĐỘ THÊM MỚI
        count++;
        const table = document.getElementById('dataTable');
        const row = table.insertRow();
        
        // Gán sự kiện click để chọn hàng
        row.onclick = function() { selectRow(this); };

        row.innerHTML = `
            <td>${count}</td>
            <td class="fw-bold">${name}</td>
            <td>${year}</td>
            <td><span class="badge bg-info text-dark">${hobbies.join(', ')}</span></td>
            <td>${country}</td>
        `;
    } else {
        // CHẾ ĐỘ CẬP NHẬT
        selectedRow.cells[1].innerText = name;
        selectedRow.cells[2].innerText = year;
        selectedRow.cells[3].innerHTML = `<span class="badge bg-info text-dark">${hobbies.join(', ')}</span>`;
        selectedRow.cells[4].innerText = country;
        
        alert("Đã cập nhật thông tin!");
        resetForm(); // Sau khi cập nhật thì giải phóng hàng đang chọn
    }
    resetForm();
}

// Hàm chọn hàng và đẩy dữ liệu sang trái
function selectRow(row) {
    // Xóa màu dòng cũ nếu có
    if (selectedRow !== null) {
        selectedRow.classList.remove('selected-row');
    }

    // Gán dòng mới và thêm hiệu ứng màu
    selectedRow = row;
    selectedRow.classList.add('selected-row');

    // Đổ dữ liệu vào form
    document.getElementById('fullName').value = selectedRow.cells[1].innerText;
    document.getElementById('birthYear').value = selectedRow.cells[2].innerText;
    document.getElementById('country').value = selectedRow.cells[4].innerText;

    // Xử lý checkbox sở thích
    const currentHobbies = selectedRow.cells[3].innerText.split(', ');
    document.querySelectorAll('.hobby').forEach(cb => {
        cb.checked = currentHobbies.includes(cb.value);
    });

    // Đổi tên nút thành Cập nhật
    document.getElementById('mainBtn').innerText = "CẬP NHẬT";
    document.getElementById('mainBtn').className = "btn btn-warning px-4 fw-bold";
}

// Hàm xóa dòng
function handleDelete() {
    if (selectedRow !== null) {
        if (confirm("Bạn có chắc chắn muốn xóa dòng này không?")) {
            selectedRow.remove();
            selectedRow = null;
            resetForm();
            alert("Đã xóa dữ liệu!");
        }
    } else {
        alert("Vui lòng chọn một hàng trong bảng để xóa!");
    }
}

// Hàm làm mới Form
function resetForm() {
    document.getElementById('userForm').reset();
    if (selectedRow !== null) {
        selectedRow.classList.remove('selected-row');
    }
    selectedRow = null;
    
    // Trả nút về trạng thái Thêm
    const btn = document.getElementById('mainBtn');
    btn.innerText = "THÊM";
    btn.className = "btn btn-add px-4";
}