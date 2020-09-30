package com.prevent.log.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogDTO {

    @ApiModelProperty(position = 1)
    private Date data;

    @ApiModelProperty(position = 2)
    private String ip;

    @ApiModelProperty(position = 3)
    private String request;

    @ApiModelProperty(position = 4)
    private String status;

    @ApiModelProperty(position = 5)
    private String useragent;
}
