function mostrarDadosDoEmpregado(empregado) {

    var identificador = empregado.id;
    var nome = empregado.employee_name;
    var salario = empregado.employee_salary;
    var idade = empregado.employee_age;
    var avatar = empregado.profile_image;

    document.getElementById("editar").disabled = true;
    document.getElementById("salvar").disabled = false;
    h1.innerHTML = "Adicionando novo empregado";

    var table = document.getElementById("tabela");

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.innerHTML = identificador;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = nome;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = salario;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = idade;
    tr.appendChild(td);

    var imagem = avatar;
    td = document.createElement('td');
    var teste = '<img src="' + imagem + '" alt="imagem" width="100%" height="150px"></img>'
    td.innerHTML =
        teste
    tr.appendChild(td);

    var id = identificador;
    td = document.createElement('td');
    td.innerHTML =
        '<a href="#" onclick="editar(\'' + id + '\')">Editar</a> ' +
        '<a href="#" onclick="excluir(\'' + id + '\')">Excluir</a>';
    tr.appendChild(td);

    table.appendChild(tr);
}

function editar(id) {

    var h1 = document.getElementById("h1");
    document.getElementById("salvar").disabled = true;
    document.getElementById("editar").disabled = false;
    h1.innerHTML = "Editando dados do empregado: " + id;
    str1 = 'http://rest-api-employees.jmborges.site/api/v1/update/';
    str = str1 + id;
    buscarEmpregado(id);
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', str, true);
    xhttp.send();
}

function alterar() {

    var h1 = document.getElementById("h1").textContent;
    var resultado = h1.substring(29, h1.length);
    str = 'http://rest-api-employees.jmborges.site/api/v1/update/' + resultado;
    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', str, true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    var novoEmpregado = {
        name: document.getElementById('name').value,
        salary: document.getElementById('salary').value,
        age: document.getElementById('age').value,
        profile_image: document.getElementById('avatar').value
    };
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4) {
            if (this.status == 200) {
                //sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var nome = retorno.data.name;
                alert("O empregado " + nome + " foi editado com sucesso!");
                location.reload();
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }

    }
    if (verificarEmpregado(novoEmpregado) == true) {
        var formatoJson = JSON.stringify(novoEmpregado);
        xhttp.send(formatoJson);
    }

}

function buscarEmpregado(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var objeto = retorno.data;
                document.getElementById('name').value = objeto.employee_name;
                document.getElementById('salary').value = objeto.employee_salary;
                document.getElementById('age').value = objeto.employee_age;
                document.getElementById('avatar').value = objeto.profile_image;

            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    };
    str1 = 'http://rest-api-employees.jmborges.site/api/v1/employee/';
    str = str1 + id;
    xhttp.open('GET', str, true);
    xhttp.send();
}

function excluir(id) {
    if (confirm("Deseja realmente apagar este empregado?")) {
        str1 = 'http://rest-api-employees.jmborges.site/api/v1/delete/';
        str = str1 + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open('DELETE', str, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    location.reload();
                }
            }
        };
    }
}

function carregar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var empregados = retorno.data; //array de empregados
                for (var i = 0; i < empregados.length; i++) {
                    var empregado = empregados[i];
                    mostrarDadosDoEmpregado(empregado);
                }
            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    };
    xhttp.open('GET', 'http://rest-api-employees.jmborges.site/api/v1/employees', true);
    xhttp.send();
}

function enviar() {

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://rest-api-employees.jmborges.site/api/v1/create', true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    var novoEmpregado = {
        name: document.getElementById('name').value,
        salary: document.getElementById('salary').value,
        age: document.getElementById('age').value,
        profile_image: document.getElementById('avatar').value
    };
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4) {
            if (this.status == 200) {
                //sucesso na requisicao
                var retorno = JSON.parse(this.responseText);
                var nome = retorno.data.name;
                alert("O empregado " + nome + " foi cadastrado com sucesso!");
                location.reload();

            } else {
                //erro na requisicao
                alert('Ocorreu um erro na requisição (status: ' + this.status + ')');
            }
        }
    }
    if (verificarEmpregado(novoEmpregado) == true) {
        var formatoJson = JSON.stringify(novoEmpregado);
        xhttp.send(formatoJson);
    }
}

function verificarEmpregado(novoEmpregado) {
    if (novoEmpregado.name == "" | novoEmpregado.salary == "" | novoEmpregado.age == "" | novoEmpregado.profile_image == "") {
        alert("Preencha todos os campos antes de submeter!")
        return false;
    } else {
        return true;
    }
}

function confirm_reset() {
    if (document.getElementById("h1").textContent.includes("Editando")) {
        if (confirm("Deseja sair do modo editando?")) {
            location.reload();
        } else {
            return confirm("Deseja limpar o formulário?");
        }
    } else {
        return confirm("Deseja mesmo limpar o formulário?");
    }
}