package com.will.sistema_pagos_backend.Repocitorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.will.sistema_pagos_backend.Entities.Pago;
import com.will.sistema_pagos_backend.Enums.PagosStatus;
import com.will.sistema_pagos_backend.Enums.TyoePago;

@Repository
public interface  PagosRepo extends JpaRepository<Pago,Long>{

    List<Pago> findByStudentidCodigo(String codigo);
    List<Pago> findByPagosstatus(PagosStatus pagosstatus);
    List<Pago> findByTipopagao(TyoePago tipopagao);
}
