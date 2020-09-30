package com.prevent.log.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "log")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @ApiModelProperty(position = 1)
    private Long id;

    @Column(name = "data")
    @ApiModelProperty(position = 2)
    private Date data;

    @Column(name = "ip")
    @ApiModelProperty(position = 3)
    private String ip;

    @Column(name = "request")
    @ApiModelProperty(position = 4)
    private String request;

    @Column(name = "status")
    @ApiModelProperty(position = 5)
    private String status;

    @Column(name = "useragent")
    @ApiModelProperty(position = 6)
    private String useragent;
}
